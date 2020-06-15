package com.hackaCcr.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hackaCcr.models.Evento;

public interface EventoRepository extends CrudRepository<Evento, String>{
	Optional<Evento> findById(long codigo);
	
	//Optional<Evento> findByIdUsuario(long idUsuario);
}
