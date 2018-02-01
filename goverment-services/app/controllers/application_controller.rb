class ApplicationController < ActionController::API

  rescue_from ActiveRecord::RecordNotFound, with: :error_record_not_found_render_method
  #respond_to :json

  before_action :set_headers
  
    

    private
    def error_record_not_found_render_method(_e)
        render json: { 'statusCode' => 404, 'error' => 'Resource Not Found' }, status: 404
    end

    def set_headers
        response.headers['Content-Type'] = 'application/json'
    end

end
