class CalendarController < ApplicationController
  before_action :require_login

  def index
    # 表示月の決定（year/monthパラメータで前月・翌月移動）
    year  = params[:year]&.to_i  || Date.today.year
    month = params[:month]&.to_i || Date.today.month

    @current_date  = Date.new(year, month, 1)
    @prev_month    = @current_date << 1
    @next_month    = @current_date >> 1

    # カレンダーグリッド用の日付配列（6週分 = 42マス）
    start_date = @current_date.beginning_of_week(:sunday)
    end_date   = start_date + 41

    @calendar_days = (start_date..end_date).to_a

    # 固定費をpayment_day => [fixed_expense] のHashで保持
    fixed_expenses = current_user.fixed_expenses
                                 .where(is_active: true)
                                 .includes(:category)
    @events_by_day = fixed_expenses.group_by(&:payment_day)
  end
end
