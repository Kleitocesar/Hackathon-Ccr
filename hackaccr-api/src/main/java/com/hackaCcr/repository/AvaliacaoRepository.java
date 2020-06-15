package com.hackaCcr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackaCcr.models.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, String>{

	Optional<Avaliacao> findById(long id);
	
	
	
	
	
}