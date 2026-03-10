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

  def upcoming_payments(days = 7)
    today = Date.today
    @user.fixed_expenses.upcoming_within(days).map do |fe|
      days_until = days_until_payment(fe.payment_day, today)
      { expense: fe, days_until: days_until }
    end.sort_by { |item| item[:days_until] }
  end

  private

  def days_until_payment(payment_day, today)
    this_month = Date.new(today.year, today.month, [payment_day, Date.new(today.year, today.month, -1).day].min)
    if this_month >= today
      (this_month - today).to_i
    else
      next_month = today >> 1
      next_date = Date.new(next_month.year, next_month.month, [payment_day, Date.new(next_month.year, next_month.month, -1).day].min)
      (next_date - today).to_i
    end
  end
end
