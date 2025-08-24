mod utils;
mod repo;
mod data;
mod gh;

use std::fs;
use reqwest::blocking::Client;
use serde_json::to_string_pretty;
use repo::Repo;
use gh::GitHub;

fn main() -> anyhow::Result<()> {
    let repos = Repo::list()?;

    let client = Client::new();

    let gh = GitHub::new(&client, repos[0].path())?;
    let data = gh.data(&repos[0])?;
    data.log()?;
    let data = GitHub::output(&repos)?;
    fs::write("output/data2.json", to_string_pretty(&data)?)?;

    Ok(())
}
