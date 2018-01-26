class PermitRequestsController < ApplicationController
  before_action :set_permit_request, only: [:show, :destroy]


  # GET /permit_requests/1
  def show
    @permit_request.resolve
    render json: @permit_request
  end

  # POST /permit_requests
  def create_structural
    @permit_request = PermitRequest.new(permit_request_params)
    @permit_request.permit_type = "residential_structural"
    create
  end

  def create_electrical
    @permit_request = PermitRequest.new(permit_request_params)
    @permit_request.permit_type = "residential_electric"
    create
  end


  # DELETE /permit_requests/1
  def destroy
    @permit_request.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_permit_request
      @permit_request = PermitRequest.find(params[:id])
      raise ActiveRecord::RecordNotFound if @permit_request.nil?
    end

    # Only allow a trusted parameter "white list" through.
    def permit_request_params
      params.permit(:address)
    end

    def create
      if @permit_request.save
        render json: @permit_request, status: :created, location: @permit_request
      else
        render json: @permit_request.errors, status: :unprocessable_entity
      end
    end

end
