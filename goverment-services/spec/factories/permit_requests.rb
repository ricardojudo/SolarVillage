FactoryBot.define do
  factory :permit_request do
    address {FFaker::AddressBR.full_address}
    status 0
    permit_type 'residential_electric'
    resolved_at "2018-01-25 15:30:36"

    trait :structural do
      permit_type 'residential_structural'
    end




  end
end
