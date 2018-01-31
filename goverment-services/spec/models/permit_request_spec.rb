require 'rails_helper'

RSpec.describe PermitRequest, type: :model do

  describe 'factories' do
    it 'valid' do
      expect(build(:permit_request)).to be_valid
    end
  end

  describe 'states' do
    it 'in progress' do
      r = build(:permit_request)
      expect(r.status).to eq "in_progress"
      expect(r).to be_in_progress
    end

    it 'approved' do
      r = build(:permit_request)
      expect(r.status).to eq "in_progress"
      expect(r).to be_in_progress
      expect(r.approve).to be_truthy
      expect(r).to be_approved
      expect(r.resolved_at).to_not be_nil
    end

    it 'denied' do
      r = build(:permit_request)
      expect(r.status).to eq "in_progress"
      expect(r).to be_in_progress
      expect(r.deny).to be_truthy
      expect(r).to be_denied
      expect(r.resolved_at).to_not be_nil
    end

  end

  describe 'validations' do
    it 'uniqueness address type' do
      expect(create(:permit_request, address: 'Calle falsa 123')).to be_valid
      r = build(:permit_request, address: 'Calle falsa 123')
      expect(r).to be_invalid
    end
  end
end
