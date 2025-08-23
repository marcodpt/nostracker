mod utils;
mod repo;
mod data;
mod gh;

use reqwest::blocking::Client;
use repo::Repo;
use gh::GitHub;

fn main() -> anyhow::Result<()> {
    let repos = Repo::list()?;

    let client = Client::new();

    let data = GitHub::new(&client, &repos[0])?;
    data.log()?;

    Ok(())
}
