class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def profile
      render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
          @token = encode_token(user_id: @user.id)
          render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
          message = @user.errors.full_messages.join(" / ")
          render json: { error: message }, status: :not_acceptable
        end
      end
    
      private
      def user_params
        params.permit(:email, :password, :name)
      end
end
