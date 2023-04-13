# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_04_11_005138) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "badge_conditions", force: :cascade do |t|
    t.bigint "badges_id", null: false
    t.integer "condition_type", null: false
    t.integer "condition_value", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["badges_id"], name: "index_badge_conditions_on_badges_id"
  end

  create_table "badges", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "level_settings", force: :cascade do |t|
    t.integer "level", null: false
    t.integer "exp", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "next_exp", default: 0
    t.index ["exp"], name: "index_level_settings_on_exp"
    t.index ["level"], name: "index_level_settings_on_level"
  end

  create_table "projects", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.date "deadline", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", default: 3
    t.boolean "is_finished", default: false, null: false
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "report_tags", force: :cascade do |t|
    t.bigint "reports_id", null: false
    t.bigint "tags_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["reports_id"], name: "index_report_tags_on_reports_id"
    t.index ["tags_id"], name: "index_report_tags_on_tags_id"
  end

  create_table "reports", force: :cascade do |t|
    t.bigint "user_id"
    t.boolean "is_finished", default: false
    t.text "y_record", null: false
    t.text "w_record", null: false
    t.text "t_record", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_reports_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.bigint "user_id"
    t.string "title", limit: 20, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "user_badges", force: :cascade do |t|
    t.bigint "users_id", null: false
    t.bigint "badges_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["badges_id"], name: "index_user_badges_on_badges_id"
    t.index ["users_id"], name: "index_user_badges_on_users_id"
  end

  create_table "user_statuses", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name", limit: 40, default: "デフォルト"
    t.integer "level", default: 1
    t.integer "exp", default: 0
    t.integer "fav_badge", default: 1
    t.integer "score", default: 0
    t.datetime "last_achievemented_at", default: -> { "now()" }
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "next_level_exp", default: 100
    t.index ["user_id"], name: "index_user_statuses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "jti", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "badge_conditions", "badges", column: "badges_id"
  add_foreign_key "projects", "users"
  add_foreign_key "report_tags", "reports", column: "reports_id"
  add_foreign_key "report_tags", "tags", column: "tags_id"
  add_foreign_key "reports", "users"
  add_foreign_key "tags", "users"
  add_foreign_key "user_badges", "badges", column: "badges_id"
  add_foreign_key "user_badges", "users", column: "users_id"
  add_foreign_key "user_statuses", "users"
end
