use serde_json::to_string_pretty;
use serde_derive::Serialize;

#[derive(Serialize)]
pub struct Data {
    pub category: String,
    pub nips: Vec<String>,
    pub title: String,
    pub description: String,
    pub repository: String,
    pub website: String,
    pub stars: u64,
    pub language: String,
    pub forks: u64,
    pub issues: u64,
    pub license: String,
    pub tags: String,
    pub since: String,
    pub last: String,
    pub archived: bool
}

impl Data {
    pub fn log (&self) -> anyhow::Result<()> {
        println!("{}", to_string_pretty(self)?);
        Ok(())
    }
}
