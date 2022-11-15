module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def create
      # LineFood.active.other_restaurant(@ordered_food.restaurant.id)は複数の
      # scope(active、other_restaurant)を組み合わせて、
      # 「他店舗でアクティブなLineFood」をActiveRecord_Relationのかたちで取得します。

      # そして、それが存在するかどうか？をexists?で判断しています。
      # ここでtrueにある場合には、JSON形式のデータを返却してreturnして処理を追えます。

      # JSON形式のデータの中身にはexisting_restaurantですでに作成されている他店舗の情報と、
      # new_restaurantでこのリクエストで作成しようとした新店舗の情報の２つを返しています。
      # また、HTTPレスポンスステータスコードは406 Not Acceptableを返します。
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json {}, status: :internal_server_error
        end
      end


      def index
        line_foods = LineFood.active
        if line_foods.exists?
          ids = []
          count = 0
          amount = 0

          line_foods.each do |line_food|
            ids << line_food.id
            count += line_food[:count]
            amount += line_food.total_amount
          end

          render json: {
            line_food_ids: ids,
            restaurant: line_foods[0].restaurant,
            count: count,
            amount: amount,
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end


      def replace
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update(active: false)
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          @line_food.attributes = {
            count: @line_food.count + params[:count],
            active: true
          }
        else
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end

    end
  end
end
