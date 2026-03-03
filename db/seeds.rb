# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# プリセットカテゴリの投入
# 冪等性を保つためfind_or_create_byを使用
[
  { name: "サブスク",   color: "#6c63ff", is_preset: true },
  { name: "公共料金",   color: "#3b82f6", is_preset: true },
  { name: "保険",       color: "#f59e0b", is_preset: true },
  { name: "ローン",     color: "#ef4444", is_preset: true },
  { name: "その他",     color: "#94a3b8", is_preset: true }
].each do |category|
  Category.find_or_create_by(name: category[:name], is_preset: true) do |c|
    c.color = category[:color]
  end
end

puts "プリセットカテゴリ: #{Category.where(is_preset: true).count}件 投入完了"