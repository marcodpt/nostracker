mod utils;
mod repo;
mod data;
mod gh;

use std::fs;
use reqwest::blocking::Client;
use serde_json::{to_string_pretty, from_str};
use include_dir::include_dir;
use minijinja::{Value, Environment, context};
use repo::Repo;
use gh::GitHub;
use utils::get;

fn main() -> anyhow::Result<()> {
    let repos = Repo::list()?;

    let client = Client::new();

    let gh = GitHub::new(&client, repos[0].path())?;
    let data = gh.data(&repos[0])?;
    data.log()?;
    let data = GitHub::output(&repos)?;
    fs::write("output/data2.json", to_string_pretty(&data)?)?;

    let md = get(&client, "\
        https://raw.githubusercontent.com\
        /aljazceru/awesome-nostr\
        /refs/heads/main/README.md\
    ")?;
    fs::write("output/README2.md", md)?;

    let mut env = Environment::new();

    for tpl in include_dir!("templates").files() {
        if let (Some(path), Some(html)) = (
            tpl.path().to_str(), tpl.contents_utf8()
        ) {
            env.add_template_owned(
                String::from(path),
                String::from(html)
            )?;
        }
    }

    let tpl = env.get_template("base.html")?;
    let config: Value = from_str(include_str!("../config.json"))?;
    let index = tpl.render(context!{
        ..config,
        ..context!{today => "2025-08-23"}
    })?;
    fs::write("output/index.html", index)?;

    Ok(())
}
