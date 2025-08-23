use serde_json::from_str;
use serde_derive::Deserialize;
use reqwest::blocking::Client;
use crate::utils::get;
use crate::data::Data;
use crate::repo::Repo;

#[derive(Deserialize)]
struct License {
    spdx_id: String,
}

#[derive(Deserialize)]
pub struct GitHub {
    name: String,
    description: String,
    html_url: String,
    homepage: String,
    stargazers_count: Option<u64>,
    language: String,
    forks_count: Option<u64>,
    open_issues: Option<u64>,
    topics: Vec<String>,
    license: Option<License>,
    created_at: String,
    pushed_at: String,
    //archived: bool,
}

impl GitHub {
    pub fn new (client: &Client, repo: &Repo) -> anyhow::Result<Data> {
        let url = format!("https://api.github.com/repos/{}", repo.gh);
        let raw = get(&client, &url)?;
        let gh: GitHub = from_str(&raw)?;

        Ok(Data {
            category: repo.category.to_string(),
            nips: repo.nips(),
            title: gh.name,
            description: gh.description,
            repository: gh.html_url,
            website: gh.homepage,
            stars: gh.stargazers_count.unwrap_or(0),
            language: gh.language,
            forks: gh.forks_count.unwrap_or(0),
            issues: gh.open_issues.unwrap_or(0),
            license: match gh.license {
                None => String::new(),
                Some(license) => license.spdx_id
            },
            tags: gh.topics.join(", "),
            since: gh.created_at,
            last: gh.pushed_at
        })
    }
}
