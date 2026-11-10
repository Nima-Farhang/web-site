variable "aws_region" {
  description = "AWS region for website resources."
  type        = string
  default     = "ap-southeast-2"
}
variable "aws_account_id" {
  description = "AWS account allowed to host the website."
  type        = string
}
variable "environment" {
  description = "Environment name used in website resource names."
  type        = string
  validation {
    condition     = contains(["dev", "test", "prod"], var.environment)
    error_message = "Environment must be dev, test, or prod."
  }
}
