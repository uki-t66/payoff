class DashboardCalculator
  def initialize(user)
    @user = user
  end

  def total_fixed_cost
    @total_fixed_cost ||= @user.fixed_expenses.where(is_active: true).sum(:fixed_cost_amount)
  end

  def available_amount
    return nil if @user.monthly_income.nil?

    @user.monthly_income - total_fixed_cost
  end

  def usage_rate
    return nil if @user.monthly_income.nil? || @user.monthly_income.zero?

    (total_fixed_cost.to_f / @user.monthly_income * 100).round(1)
  end

  def income_set?
    @user.monthly_income.present?
  end

  def over_budget?
    return false unless income_set?

    usage_rate > 50
  end
end