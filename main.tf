provider "aws" {
    access_key = var.access_key
    secret_key = var.secret_key
    region = "eu-central-1"
}


resource "aws_security_group" "recensioni-film-bd" {
    name      = "recensioni-film-bd"
    
    ingress {
        from_port = 0
        to_port = 65535
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 65535
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}



resource "aws_security_group" "recensioni_film"{
    name = "recensioni_film"
    description = "recensioni-film"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 5000
        to_port = 5000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_db_instance" "RecensioniDB" {
  allocated_storage         = 20
  storage_type              = "gp2"
  engine                    = "mysql"
  engine_version            = "8.0.16"
  instance_class            = "db.t2.micro"
  name                      = "recensioniFilm"
  identifier                = "recensioni-film"
  username                  = "FedericoQuartier"
  password                  = var.db_password
  parameter_group_name      = "default.mysql8.0"
  port                      = 3306
  publicly_accessible       = true
  skip_final_snapshot       = true
  multi_az                  = false
  vpc_security_group_ids    = [aws_security_group.recensioni-film-bd.id]
}

resource "aws_instance" "recensioni-film" {
    
    ami           = "ami-00a205cb8e06c3c4e"
    instance_type = "t2.micro"
    security_groups = [aws_security_group.recensioni_film.name]
    key_name = "recensioni-film"

    user_data = <<-EOF
            #! /bin/bash
            sudo yum update -y
            sudo yum install docker -y
            sudo service docker start
            sudo usermod -a -G docker ec2-user
            sudo docker pull federicoquartieri/recensioni-film
            sudo docker run -d -p 80:80 federicoquartieri/recensioni-film
        EOF
}




output "IP" {
    value = aws_instance.recensioni-film.public_ip
}

output "DNS" {
    value = aws_instance.recensioni-film.public_dns
}

output "ENDPOINT" {
    value = aws_db_instance.RecensioniDB.endpoint
}