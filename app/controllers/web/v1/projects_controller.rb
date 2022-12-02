# frozen_string_literal: true

module Web
  module V1
    class ProjectsController < ApplicationController
      before_action :set_project, only: %i[show debts]

      def index
        @projects = Project.all
      end

      def show; end

      def debts
        @debts = @project.debts
      end

      private

      def set_project
        @project = Project.find(params[:id])
      end
    end
  end
end
