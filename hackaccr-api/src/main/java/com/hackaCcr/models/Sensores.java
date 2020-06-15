package com.hackaCcr.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Sensores implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	private String id;
	
	public long latitude;
	
	public long longitude;
	
	public long velocidade;
	
	public long x;
	public long y;
	public long z;
	
	@ManyToOne(fetch = FetchType.EAGER,  cascade=CascadeType.ALL)
	@JoinColumn(name="ID_USUARIO")
	private Usuario usuario;
}
