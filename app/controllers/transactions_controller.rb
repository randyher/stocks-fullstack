class TransactionsController < ApplicationController

    def create 
        @transaction = Transaction.create(transaction_params)
        current_balance = current_user.balance - @transaction.cost
        current_user.update(balance: current_balance)
        render json: { transaction: @transaction, current_balance: current_balance }
    end 

    private 

    def transaction_params 
        params.require(:transaction).permit(:ticker, :quantity, :cost, :user_id)
    end 
end
