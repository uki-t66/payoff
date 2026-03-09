class DashboardController < ApplicationController
  before_action :require_login

  def index
    @calc = DashboardCalculator.new(current_user)
    @fixed_expenses = current_user.fixed_expenses
                                  .includes(:category)
                                  .order(:payment_day)
  end
end
