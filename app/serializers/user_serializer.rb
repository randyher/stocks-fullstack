class UserSerializer < ActiveModel::Serializer
  attributes :email, :name, :balance
end
