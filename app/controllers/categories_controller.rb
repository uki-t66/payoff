class CategoriesController < ApplicationController
  before_action :require_login

  def create
    @category = current_user.categories.build(category_params)
    if @category.save
      render json: { id: @category.id, name: @category.name, color: @category.color }, status: :created
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :color)
  end
end