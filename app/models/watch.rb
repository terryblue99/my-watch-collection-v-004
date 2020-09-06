class Watch < ApplicationRecord
  belongs_to :user

  alias_attribute :watch_related, :watch_maker
  alias_attribute :related_title, :watch_name
  alias_attribute :related_input1, :movement
  alias_attribute :related_input2, :complications
  alias_attribute :related_input3, :band
  alias_attribute :related_input4, :model_number
  alias_attribute :related_input5, :case_measurement
  alias_attribute :related_input6, :water_resistance    
  
  has_one_attached :image

  validates :watch_name, :watch_maker, presence: true
  validate :image_attached

  def image_attached
    # Check if a watch image has been selected  
    # and, if not, store a default image
    if !self.image.attached?
      self.image.attach(io: File.open(Rails.root.join('my-watch-collection-front', 
                                                      'src/images',
                                                      'no_image_uploaded.png'
                                                    )
                                      ), 
                        filename: 'no_image_uploaded.png',
                        content_type: 'image/png'
                      )
    end
  end
  
end