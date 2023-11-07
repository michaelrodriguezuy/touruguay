package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "country")
public class Pais {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer country_id;

    private String country_name;
    private String iso_code;

    public Integer getCountry_id() {
        return country_id;
    }

    public void setCountry_id(Integer country_id) {
        this.country_id = country_id;
    }

    public String getCountry_name() {
        return country_name;
    }

    public void setCountry_name(String country_name) {
        this.country_name = country_name;
    }

    public String getIso_code() {
        return iso_code;
    }

    public void setIso_code(String iso_code) {
        this.iso_code = iso_code;
    }

    public Pais(){}

    public Pais(Integer country_id, String country_name, String iso_code) {
        this.country_id = country_id;
        this.country_name = country_name;
        this.iso_code = iso_code;
    }

    @Override
    public String toString() {
        return "Pais{" +
                "country_id=" + country_id +
                ", country_name='" + country_name + '\'' +
                ", iso_code='" + iso_code + '\'' +
                '}';
    }
}
