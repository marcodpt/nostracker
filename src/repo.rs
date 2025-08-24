use serde_json::from_str;
use serde_derive::Deserialize;
use anyhow::anyhow;

#[derive(Deserialize)]
pub struct Repo {
    gh: String,
    nips: Vec<u8>,
    category: String
}

impl Repo {
    pub fn list () -> anyhow::Result<Vec<Repo>> {
        let list: Vec<Repo> = from_str(include_str!("../data.json"))?;
        let mut repos: Vec<&str> = Vec::new();
        for repo in &list {
            repos.push(repo.gh.as_str());
            if
                repo.gh.chars().filter(|c| *c == '/').count() != 1 ||
                repo.gh.chars().filter(|c| *c == ' ').count() != 0
            {
                return Err(anyhow!("BAD FORMAT: {}", repo.gh));
            }
        }
        repos.sort();

        let mut i = 1;
        while i < repos.len() {
            if repos[i] == repos[i - 1] {
                return Err(anyhow!("DUPLICATED: {}", repos[i]));
            }
            i = i + 1;
        }

        Ok(list)
    }

    pub fn nips (&self) -> Vec<String> {
        let mut nips: Vec<u8> = Vec::new();
        for nip in &self.nips {
            if !nips.contains(nip) {
                nips.push(*nip);
            }
        }
        nips.sort();
        nips.into_iter().map(|nip| {
            format!("NIP{:0>2}", nip)
        }).collect::<Vec<String>>()
    }

    pub fn category(&self) -> anyhow::Result<String> {
        if
            &self.category == "clients" ||
            &self.category == "relays" ||
            &self.category == "libraries" ||
            &self.category == "tools" ||
            &self.category == "informations"
        {
            Ok(self.category.to_string())
        } else {
            Err(anyhow!("Unkown category: {}", &self.category))
        }
    }

    pub fn path (&self) -> &str {
        &self.gh
    }
}
