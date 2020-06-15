package com.hackaCcr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.hackaCcr.models.Sensores;


public interface SensoresRepository extends JpaRepository<Sensores, String>{

	Optional<Sensores> findByIdUsuario(long idUsuario);
	
	
}

