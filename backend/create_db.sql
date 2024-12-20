CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar NOT NULL,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "options" integer
);

CREATE TABLE "user_options" (
  "id" serial PRIMARY KEY,
  "user" integer,
  "notifications_me_only" bool,
  "notifications" bool,
  "status" varchar
);

CREATE TABLE "chats" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "private" bool,
  "administrator" integer,
  "last_update" timestamp,
  "created_by" integer,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "messages" (
  "id" serial PRIMARY KEY,
  "body" text,
  "chat" integer,
  "mention" integer,
  "created_by" integer,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "chats_messages" (
  "chat" integer,
  "message" integer
);

CREATE TABLE "attachments" (
  "id" serial PRIMARY KEY,
  "url" varchar,
  "message" integer,
  "fileType" varchar,
  "fileSize" double precision,
  "fileName" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "created_by" integer
);

CREATE TABLE "chat_memberships" (
  "id" serial PRIMARY KEY,
  "user" integer,
  "chat" integer,
  "role" integer,
  "invitation" integer,
  "kicked" bool,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "created_by" integer,
  "last_updated" timestamp
);

CREATE TABLE "chat_member_kick" (
  "chat_membership" integer,
  "user" integer
);

CREATE TABLE "invitations" (
  "id" serial PRIMARY KEY,
  "user" integer,
  "chat" integer,
  "status" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "created_by" integer
);

-- Add defaults

INSERT INTO "user_options" ("user", "notifications_me_only", "notifications", "status") VALUES (1, false, true, 'active');
INSERT INTO "users" ("username", "first_name", "last_name", "email", "password", "options") VALUES ('admin', 'Admin', 'Admin', 'admin@admin.admin', '$scrypt$n=16384,r=8,p=1$B6CfEKDHEQ9rn2KHYDZbFA$c4QMoukMsFsSW8oIZMmF1bjciv3R+qJrYjqWhO4Yy2VPpOJ6aab///PHRH0FR7gxwWtKpernp7PCW2a9dogdLw', 1);
INSERT INTO "chats" ("name", "private", "administrator", "last_update", "created_by") VALUES ('General', false, 1, CURRENT_TIMESTAMP, 1);
INSERT INTO "chat_memberships" ("user", "chat", "role", "created_by") VALUES (1, 1, 1, 1);
INSERT INTO "messages" ("body", "chat", "created_by") VALUES ('Welcome to the chat!', 1, 1);
INSERT INTO "chats_messages" ("chat", "message") VALUES (1, 1);

-- Add Foreign Keys after table creation

ALTER TABLE "user_options" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "chats" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");
ALTER TABLE "chats" ADD FOREIGN KEY ("administrator") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("chat") REFERENCES "chats" ("id");
ALTER TABLE "messages" ADD FOREIGN KEY ("mention") REFERENCES "users" ("id");
ALTER TABLE "messages" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chats_messages" ADD FOREIGN KEY ("chat") REFERENCES "chats" ("id");
ALTER TABLE "chats_messages" ADD FOREIGN KEY ("message") REFERENCES "messages" ("id");

ALTER TABLE "attachments" ADD FOREIGN KEY ("message") REFERENCES "messages" ("id");
ALTER TABLE "attachments" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chat_memberships" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
ALTER TABLE "chat_memberships" ADD FOREIGN KEY ("chat") REFERENCES "chats" ("id");
ALTER TABLE "chat_memberships" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");
ALTER TABLE "chat_memberships" ADD FOREIGN KEY ("invitation") REFERENCES "invitations" ("id");

ALTER TABLE "invitations" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
ALTER TABLE "invitations" ADD FOREIGN KEY ("chat") REFERENCES "chats" ("id");
ALTER TABLE "invitations" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chat_member_kick" ADD FOREIGN KEY ("chat_membership") REFERENCES "chat_memberships" ("id");
ALTER TABLE "chat_member_kick" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("options") REFERENCES "user_options" ("id");
