package com.hackaCcr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.hackaCcr.models.Entidade;


public interface EntidadeRepository extends JpaRepository<Entidade, String>{

	Optional<Entidade> findById(long id);
	}

