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
