package com.hackaCcr.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import org.hibernate.validator.constraints.NotEmpty;


@Entity
public class Evento implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long id;

	@NotEmpty
	private String descricao;
	
	private long latitude;
	
	private long longitude;
	
	@NotEmpty
	private String data;

	@NotEmpty
	private String horario;
	
	//private List<TipoEvento> TipoEvento;
	
	public long getid() {
		return id;
	}

	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getHorario() {
		return horario;
	}
	public void setHorario(String horario) {
		this.horario = horario;
	}

	public long getLatitude() {
		return latitude;
	}

	public void setLatitude(long latitude) {
		this.latitude = latitude;
	}

	public long getLongitude() {
		return longitude;
	}

	public void setLongitude(long longitude) {
		this.longitude = longitude;
	}

	/*public List<TipoEvento> getIdTipoEvento() {
		return idTipoEvento;
	}

	public void setIdTipoEvento(List<TipoEvento> idTipoEvento) {
		this.idTipoEvento = idTipoEvento;
	}

	public List<TipoEvento> getTipoEvento() {
		return TipoEvento;
	}

	public void setTipoEvento(List<TipoEvento> tipoEvento) {
		TipoEvento = tipoEvento;
	}*/
	
}
