package com.hackaCcr.repository;

import java.util.Date;
import java.util.Optional;
import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hackaCcr.models.Beneficio;

public interface BeneficioRepository extends JpaRepository<Beneficio, String>{

	Optional<Beneficio> findById(long id);
	
	java.util.List<Beneficio> findByVigentes(Date data);
	
	
	
	
}
