class PermitRequest < ApplicationRecord

    include AASM

    validates :address, :permit_type, presence: true
    validates :address, uniqueness: {scope: :permit_type }

    enum status: {in_progress: 0,approved: 10, denied: 20}

    enum permit_type: {residential_electric: 10, residential_structural: 20}



    aasm column: :status, enum: true, whiny_transitions: false do
        state :in_progress, initial: true
        state :approved, :denied
        

        event :approve do
            transitions from: :in_progress, to: :approved
            after :_resolved_at
        end

        event :deny do
            transitions from: :in_progress, to: :denied
            after :_resolved_at
        end

    end

    protected
    def _resolved_at
        resolved_at = Time.zone.now
        save
    end

end
