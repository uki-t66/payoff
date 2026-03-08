class FixedExpensesController < ApplicationController
  before_action :require_login
  before_action :set_fixed_expense, only: [ :edit, :update ]

  def index
    @fixed_expenses = current_user.fixed_expenses
                                  .includes(:category)
                                  .order(:payment_day)
    @total_amount = @fixed_expenses.sum(:fixed_cost_amount)
  end

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

  def edit
    @categories = Category.where(is_preset: true)
  end

  def update
    if @fixed_expense.update(fixed_expense_params)
      redirect_to fixed_expenses_path, notice: "固定費を更新しました"
    else
      @categories = Category.where(is_preset: true)
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_fixed_expense
    @fixed_expense = current_user.fixed_expenses.find_by!(uuid: params[:uuid])
  end

  def fixed_expense_params
    params.require(:fixed_expense).permit(:name, :category_id, :fixed_cost_amount, :payment_day)
  end
end
