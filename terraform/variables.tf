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

variable "force_destroy_buckets" {
  description = "Allow deletion of all website object versions during explicit teardown only."
  type        = bool
  default     = false
}

variable "custom_domain" {
  description = "Optional public hostname for this environment; DNS remains externally managed."
  type        = string
  default     = ""
  validation {
    condition     = var.custom_domain == "" || can(regex("^[a-z0-9][a-z0-9.-]*\\.[a-z]{2,}$", var.custom_domain))
    error_message = "Use a lowercase hostname without a scheme, path, or wildcard."
  }
}

variable "enable_custom_domain" {
  description = "Attach the custom hostname only after its certificate has been DNS-validated."
  type        = bool
  default     = false
  validation {
    condition     = !var.enable_custom_domain || var.custom_domain != ""
    error_message = "Set custom_domain before enabling it."
  }
}
