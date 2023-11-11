package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "city")
public class Ciudad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer city_id;

    private String city_name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Pais country;

    public Integer getCity_id() {
        return city_id;
    }

    public void setCity_id(Integer city_id) {
        this.city_id = city_id;
    }

    public String getCity_name() {
        return city_name;
    }

    public void setCity_name(String city_name) {
        this.city_name = city_name;
    }

    public Pais getCountry() {
        return country;
    }

    public void setCountry(Pais country) {
        this.country = country;
    }

    public Ciudad(){}

    public Ciudad(Integer city_id, String city_name, Pais country) {
        this.city_id = city_id;
        this.city_name = city_name;
        this.country = country;
    }

    @Override
    public String toString() {
        return "Ciudad{" +
                "city_id=" + city_id +
                ", city_name='" + city_name + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
