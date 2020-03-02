class UserSerializer < ActiveModel::Serializer
  attributes :email, :name, :balance, :transactions, :id
end
