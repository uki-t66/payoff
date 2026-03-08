class UsersController < ApplicationController
  before_action :redirect_if_logged_in, only: [ :new ]
  before_action :require_login, only: [ :edit, :update, :destroy, :update_income ]
  before_action :set_user, only: [ :edit, :update, :destroy, :update_income ]



  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to dashboard_path, flash: { success: "アカウントを作成しました" }
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if params[:user].key?(:current_password)
      update_password
    elsif params[:user].key?(:email)
      update_email
    else
      update_name
    end
  end

  def destroy
    @user.destroy
    session.delete(:user_id)
    redirect_to root_path, notice: "アカウントを削除しました"
  end

  def update_income
    if @user.update(income_params)
      redirect_to dashboard_path, notice: "月収を設定しました"
    else
      redirect_back fallback_location: dashboard_path, alert: @user.errors.full_messages.first
    end
  end

  private

  def update_name
    if @user.update(name_params)
      redirect_to edit_user_path(current_user), notice: "ユーザー名を変更しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def update_email
    if @user.update(email_params)
      redirect_to edit_user_path(current_user), notice: "メールアドレスを変更しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def update_password
    unless @user.authenticate(params[:user][:current_password])
      @user.errors.add(:current_password, "が正しくありません")
      render :edit, status: :unprocessable_entity and return
    end

    if @user.update(password_params)
      redirect_to edit_user_path(current_user), notice: "パスワードを変更しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def name_params
    params.require(:user).permit(:name)
  end

  def email_params
    params.require(:user).permit(:email)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def income_params
    params.require(:user).permit(:monthly_income)
  end
end
