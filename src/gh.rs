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
    repo: Option<String>,
    name: String,
    description: Option<String>,
    html_url: String,
    homepage: Option<String>,
    stargazers_count: u64,
    language: Option<String>,
    forks_count: u64,
    open_issues: u64,
    topics: Vec<String>,
    license: Option<License>,
    created_at: String,
    pushed_at: String,
    //archived: bool,
}

impl GitHub {
    pub fn new (client: &Client, path: &str) -> anyhow::Result<GitHub> {
        let url = format!("https://api.github.com/repos/{}", path);
        let raw = get(&client, &url)?;
        let gh: GitHub = from_str(&raw)?;

        Ok(gh)
    }

    pub fn data (self, repo: &Repo) -> anyhow::Result<Data> {
        Ok(Data {
            category: repo.category()?,
            nips: repo.nips(),
            title: self.name,
            description: self.description.unwrap_or(String::new()),
            repository: self.html_url,
            website: self.homepage.unwrap_or(String::new()),
            stars: self.stargazers_count,
            language: self.language.unwrap_or(String::new()),
            forks: self.forks_count,
            issues: self.open_issues,
            license: match self.license {
                None => String::new(),
                Some(license) => license.spdx_id
            },
            tags: self.topics.join(", "),
            since: self.created_at,
            last: self.pushed_at
        })
    }

    pub fn output (repos: &Vec<Repo>) -> anyhow::Result<Vec<Data>> {
        let list: Vec<GitHub> = from_str(include_str!("../output/api.json"))?;

        let mut result: Vec<Data> = Vec::new();
        for row in list {
            for repo in repos {
                if let Some(ref path) = row.repo {
                    if path == repo.path() {
                        result.push(row.data(&repo)?);
                        break;
                    }
                }
            }
        }

        Ok(result)
    }
}
