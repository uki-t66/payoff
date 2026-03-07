class FixedExpensesController < ApplicationController
  before_action :require_login

  def new
    @fixed_expense = FixedExpense.new
    @categories = Category.where(is_preset: true)
  end

  def create
    @fixed_expense = current_user.fixed_expenses.build(fixed_expense_params)
    if @fixed_expense.save
      redirect_to fixed_expenses_path, notice: "固定費を登録しました"
    else
      @categories = Category.where(is_preset: true)
      render :new, status: :unprocessable_entity
    end
  end

  private

  def fixed_expense_params
    params.require(:fixed_expense).permit(:name, :category_id, :fixed_cost_amount, :payment_day)
  end
end
