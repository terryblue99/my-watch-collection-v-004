class Api::V4::WatchesController < ApplicationController

  before_action :set_watch, only: [:update, :destroy]

  def index
      @watches = Watch.where(user_id: params[:user_id]).with_attached_image
      render json: @watches.map { |watch|
          watch.as_json.merge({ image: url_for(watch.image) })
      } 
  end

  def create
      @newWatch = Watch.create!(watch_params)
      
      if @newWatch
          session[:watch_id] = @newWatch.id
          render json: {
            status: :created,
            watch: @newWatch
          }
      else
          render json: { status: 500 }
      end
  end

  def update 
      @watch.update(watch_params)   
  end

  def destroy
      @watch.destroy
  end

  private

  def set_watch
      @watch = Watch.find(params[:id])
  end

  def watch_params
      # params hash keys (strong params)
      params.permit(
        :watch_name, 
        :watch_maker, 
        :movement, 
        :complications,
        :band, 
        :model_number, 
        :case_measurement,
        :water_resistance, 
        :date_bought,
        :date_last_worn,
        :cost,
        :user_id,
        :notes,
        :image,
        :watch_related,
        :related_title,
        :related_input1,
        :related_input2,
        :related_input3,
        :related_input4,
        :related_input5,
        :related_input6
      )
  end
  
end