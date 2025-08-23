use serde_json::{from_str, Value, to_string_pretty};
use reqwest::blocking::Client;
use reqwest::header::USER_AGENT;

pub fn get (client: &Client, url: &str) -> anyhow::Result<String> {
    let raw = client
        .get(url)
        .header(USER_AGENT, "nostracker")
        .send()?.text()?;

    let response: Value = from_str(&raw)?;
    println!("{}", to_string_pretty(&response)?);

    Ok(raw)
}
