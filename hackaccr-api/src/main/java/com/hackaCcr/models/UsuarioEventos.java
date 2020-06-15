package com.hackaCcr.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class UsuarioEventos implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	private String id;

	private long idUsuario;
	
	//private List<Evento> eventos;

	public long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(long idUsuario) {
		this.idUsuario = idUsuario;
	}

	/*public List<Evento> getEventos() {
		return eventos;
	}

	public void setEventos(List<Evento> eventos) {
		this.eventos = eventos;
	}*/
	

}