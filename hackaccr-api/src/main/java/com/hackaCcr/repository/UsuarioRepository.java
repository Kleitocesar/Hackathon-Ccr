package com.hackaCcr.repository;

import org.springframework.data.repository.CrudRepository;

import com.hackaCcr.models.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, String>{

	Usuario findByLogin(String login);
}
