-- VeloTribe waitlist — schema inicial
-- Aplicar amb: wrangler d1 execute velotribe --file=./migrations/0001_init.sql --remote

CREATE TABLE IF NOT EXISTS waitlist_cyclist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  cycling_type TEXT NOT NULL CHECK (cycling_type IN ('road','gravel','mtb','all')),

  -- Step 2 (nullable, omplerts si l'usuari completa)
  country TEXT,
  experience TEXT CHECK (experience IS NULL OR experience IN ('first','few','regular','local')),
  dream TEXT,                      -- JSON array de strings
  duration TEXT CHECK (duration IS NULL OR duration IN ('weekend','week','fortnight','long','local')),
  dream_text TEXT,
  step2_completed_at TEXT,

  -- UTMs i metadata
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  cf_country TEXT,                 -- header cf-ipcountry
  user_agent TEXT,
  locale TEXT NOT NULL DEFAULT 'en',

  -- Consent (Art. 7 GDPR)
  consent_text_version TEXT NOT NULL,
  consent_timestamp TEXT NOT NULL,
  consent_ip_hash TEXT NOT NULL,

  -- Status del lead
  status TEXT NOT NULL DEFAULT 'step1_only' CHECK (status IN ('step1_only','qualified','converted')),

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waitlist_host (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('accommodation','guide','tour','event','other')),
  location TEXT NOT NULL,

  -- Step 2 hosts (per ara igual ciclistes; pot expandir-se)
  country TEXT,
  experience TEXT,
  dream TEXT,
  duration TEXT,
  dream_text TEXT,
  step2_completed_at TEXT,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  cf_country TEXT,
  user_agent TEXT,
  locale TEXT NOT NULL DEFAULT 'en',

  consent_text_version TEXT NOT NULL,
  consent_timestamp TEXT NOT NULL,
  consent_ip_hash TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'step1_only' CHECK (status IN ('step1_only','qualified','converted')),

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cyclist_created ON waitlist_cyclist(created_at);
CREATE INDEX IF NOT EXISTS idx_cyclist_status ON waitlist_cyclist(status);
CREATE INDEX IF NOT EXISTS idx_cyclist_country ON waitlist_cyclist(country);
CREATE INDEX IF NOT EXISTS idx_host_created ON waitlist_host(created_at);
CREATE INDEX IF NOT EXISTS idx_host_status ON waitlist_host(status);
