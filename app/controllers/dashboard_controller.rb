class DashboardController < ApplicationController
  before_action :require_login

  def index
    @calc = DashboardCalculator.new(current_user)
    @fixed_expenses = current_user.fixed_expenses
                                  .includes(:category)
                                  .order(:payment_day)
    @upcoming_payments = @calc.upcoming_payments(7)
    @category_breakdown = @calc.category_breakdown
  end
end
