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

    def resolve
        #Exceptional cases
        return approve! if address.include? 'approve'
        return deny! if address.include? 'deny'

        #
        random = Random.new.rand(100)
        approve! if random < 25
        deny! if random > 85
        resolved?
    end

    def resolved?
        denied? || approved?    
    end

    protected
    def _resolved_at
        update(resolved_at: Time.zone.now) if resolved?
    end

end
