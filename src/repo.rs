use serde_json::from_str;
use serde_derive::Deserialize;

#[derive(Deserialize)]
pub struct Repo {
    pub gh: String,
    nips: Vec<u8>,
    pub category: String
}

/*const nips = []
repo.nips.forEach(nip => {
  if (nips.indexOf(nip) < 0) {
    nips.push(nip)
  }
})
repo.nips = nips.map(nip => 'NIP'+String(nip).padStart(2, '0'))*/

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
}
