provider "aws" {
  region              = var.aws_region
  allowed_account_ids = [var.aws_account_id]
  default_tags {
    tags = {
      Project     = "personal-website"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# CloudFront requires its viewer certificate in us-east-1, regardless of the S3 region.
provider "aws" {
  alias               = "us_east_1"
  region              = "us-east-1"
  allowed_account_ids = [var.aws_account_id]
}
