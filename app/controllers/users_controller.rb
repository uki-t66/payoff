class UsersController < ApplicationController
  before_action :redirect_if_logged_in, only: [ :new ]
  before_action :require_login, only: [ :edit, :update ]
  before_action :set_user, only: [ :edit, :update ]

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
    if @user.update(profile_params)
      redirect_to edit_user_path(current_user), notice: "#{update_target}を変更しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def profile_params
    params.require(:user).permit(:name, :email)
  end

  def update_target
    params[:user][:email].present? ? "メールアドレス" : "ユーザー名"
  end
end
