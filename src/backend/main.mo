import Text "mo:core/Text";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

actor {
  // Types
  type PriceTier = {
    stage1 : Float;
    stage2 : Float;
    stage3 : ?Float;
  };

  module PriceTier {
    public func compare(p1 : PriceTier, p2 : PriceTier) : Order.Order {
      switch (Float.compare(p1.stage1, p2.stage1)) {
        case (#equal) {
          switch (Float.compare(p1.stage2, p2.stage2)) {
            case (#equal) { compareStage3(p1.stage3, p2.stage3) };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };

    func compareStage3(s1 : ?Float, s2 : ?Float) : Order.Order {
      switch (s1, s2) {
        case (null, null) { #equal };
        case (null, ?_) { #less };
        case (?_, null) { #greater };
        case (?v1, ?v2) { Float.compare(v1, v2) };
      };
    };
  };

  type Service = {
    name : Text;
    description : Text;
    category : Text;
    priceTiers : PriceTier;
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : Order.Order {
      Text.compare(service1.name, service2.name);
    };
  };

  type Project = {
    id : Nat;
    carMake : Text;
    carModel : Text;
    carYear : Nat;
    bhp : Float;
    torqueNm : Float;
    zeroToSixty : Float;
    stageLevel : Nat;
    description : Text;
    tags : [Text];
    isFeatured : Bool;
    timestamp : Time.Time;
  };

  module Project {
    public func compare(project1 : Project, project2 : Project) : Order.Order {
      Int.compare(project1.id, project2.id);
    };
  };

  type Part = {
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    inStock : Bool;
  };

  module Part {
    public func compare(part1 : Part, part2 : Part) : Order.Order {
      Text.compare(part1.name, part2.name);
    };
  };

  type Booking = {
    customerName : Text;
    email : Text;
    phone : Text;
    bookingType : Text;
    carDetails : Text;
    preferredDate : Time.Time;
    message : Text;
    timestamp : Time.Time;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Int.compare(booking1.timestamp, booking2.timestamp);
    };
  };

  type Stats = {
    totalBuilds : Nat;
    avgBhpGain : Float;
    customerCount : Nat;
  };

  // Storage
  let services = Map.empty<Text, Service>();
  let projects = Map.empty<Nat, Project>();
  let parts = Map.empty<Text, Part>();
  let bookings = Map.empty<Nat, Booking>();
  var projectIdCounter = 0;
  var featuredProjectId : ?Nat = null;

  // Services Catalog
  public shared ({ caller }) func addService(service : Service) : async () {
    if (services.containsKey(service.name)) {
      Runtime.trap("Service already exists");
    };
    services.add(service.name, service);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray().sort();
  };

  // Project Archive
  public shared ({ caller }) func addProject(project : Project) : async Nat {
    let newProject : Project = {
      project with
      id = projectIdCounter;
      timestamp = Time.now();
    };
    projects.add(projectIdCounter, newProject);
    projectIdCounter += 1;
    projectIdCounter - 1;
  };

  public shared ({ caller }) func featureProject(projectId : Nat) : async () {
    if (not projects.containsKey(projectId)) {
      Runtime.trap("Project does not exist");
    };
    featuredProjectId := ?projectId;
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProject() : async ?Project {
    switch (featuredProjectId) {
      case (null) { null };
      case (?id) { projects.get(id) };
    };
  };

  // Parts Shop
  public shared ({ caller }) func addPart(part : Part) : async () {
    if (parts.containsKey(part.name)) {
      Runtime.trap("Part already exists");
    };
    parts.add(part.name, part);
  };

  public query ({ caller }) func getAllParts() : async [Part] {
    parts.values().toArray().sort();
  };

  public shared ({ caller }) func updatePartStock(partName : Text, inStock : Bool) : async () {
    switch (parts.get(partName)) {
      case (null) { Runtime.trap("Part does not exist") };
      case (?part) {
        let updatedPart : Part = { part with inStock };
        parts.add(partName, updatedPart);
      };
    };
  };

  // Booking/Contact Form
  public shared ({ caller }) func submitBooking(booking : Booking) : async Nat {
    let newBooking : Booking = {
      booking with
      timestamp = Time.now();
    };
    let id = bookings.size();
    bookings.add(id, newBooking);
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };

  // Performance Stats
  public query ({ caller }) func getStats() : async Stats {
    let totalBuilds = projects.size();
    var totalBhpGain : Float = 0;
    projects.values().forEach(
      func(project) {
        totalBhpGain += project.bhp;
      }
    );
    let avgBhpGain = if (totalBuilds > 0) {
      totalBhpGain / totalBuilds.toFloat();
    } else {
      0.0;
    };

    {
      totalBuilds;
      avgBhpGain;
      customerCount = bookings.size();
    };
  };
};
